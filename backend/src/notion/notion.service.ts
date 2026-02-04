import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { flattenNotionProperties } from './utils/notion.utils';
import { newRecordEmailDto } from 'src/dto/record.dto';

@Injectable()
export class NotionService {
    private notion = new Client({ auth: process.env.NOTION_SECRET });

    private readonly dataSourceId = "2e94c8a2-1d01-8101-926c-000bf61deb52";

    async addNewRecord(newEmailDto: newRecordEmailDto) {
        try {
            const response = await this.notion.pages.create({
                parent: { data_source_id: this.dataSourceId },
                properties: {
                    Name: {
                        title: [{ type: "text", text: { content: newEmailDto.name } }],
                    },

                    email: {
                        email: newEmailDto.email,
                    },

                    company: {
                        rich_text: [{ type: "text", text: { content: newEmailDto.company } }],
                    },

                    "linkedin ": {
                        rich_text: [{ type: "text", text: { content: newEmailDto.linkedin } }]
                    },

                    number: {
                        number: Number(newEmailDto.number),
                    },

                    place: {
                        rich_text: [{ type: "text", text: { content: newEmailDto.place } }],
                    },
                    "Created Date": {
                        date: { start: newEmailDto.createdDate },
                    },
                },
            });



            return { success: true, id: response.id };
        } catch (error) {
            console.error('Notion insert failed:', error);
            throw error;
        }
    }

    async updateEmail(email: string, select: string) {
        const pageId = await this.findPageIdByEmail(email, this.dataSourceId);
        if (!pageId) return;
        const page: any = await this.notion.pages.retrieve({ page_id: pageId });
        if (email && select) {
            await this.notion.pages.update({
                page_id: pageId,
                properties: {
                    select: { rich_text: [{ type: "text", text: { content: "done" } }] }
                }
            });
            return;
        }

        const emailProp = page?.properties?.email;
        if (!emailProp) return;

        // CASE 1 — Native Email property
        if (emailProp.type === "email") {
            if ((emailProp.email || "").toLowerCase() === email.toLowerCase()) {
                await this.notion.pages.update({
                    page_id: pageId,
                    properties: { email: { email: null } },
                });
            }
            return;
        }

        // CASE 2 — Rich text property with multiple emails
        if (emailProp.type === "rich_text") {
            const combined = emailProp.rich_text.map((t: any) => t.plain_text).join(" ");

            const updated = combined
                .split(/[,\s;]+/)
                .filter(e => e && e.toLowerCase() !== email.toLowerCase())
                .join(", ");

            await this.notion.pages.update({
                page_id: pageId,
                properties: {
                    email: {
                        rich_text: updated
                            ? [{ type: "text", text: { content: updated } }]
                            : [],
                    },
                },
            });

        }
    }

    findPageIdByEmail = async (email: string, dataSourceId: string) =>
        (await this.notion.dataSources.query({
            data_source_id: dataSourceId,
            filter: {
                or: [
                    { property: 'email', email: { equals: email } },
                    { property: 'email', rich_text: { contains: email } },
                ],
            },
            page_size: 1,
        })).results[0]?.id || null;

    async getDBEmailList(dataSourcesId: string, cursor?: string, limit?: number, start?: number, end?: number, select?: string) {
        try {
            const response = await this.notion.dataSources.query({
                data_source_id: dataSourcesId,
                start_cursor: cursor,
                page_size: limit || undefined,
                sorts: [
                    {
                        direction: "descending",
                        property: "Created Date",
                    },
                ],
                filter: {
                    and: [
                        {
                            property: "email",
                            email: { is_not_empty: true },
                        },
                        ...(select
                            ? [
                                {
                                    property: "select",
                                    rich_text: { contains: select },
                                },
                            ]
                            : [
                                {
                                    property: "select",
                                    rich_text: { is_empty: true as const },
                                },
                            ])
                        ,
                    ],
                },
            });


            if (start && end) {
                return {
                    data: response.results.map((row: any) => flattenNotionProperties(row.properties)).slice(start - 1, end),
                    nextCursor: response.next_cursor,
                    hasMore: response.has_more,
                };
            }

            return {
                data: response.results.map((row: any) => flattenNotionProperties(row.properties)),
                nextCursor: response.next_cursor,
                hasMore: response.has_more,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getDBEmailMessageList(data_source_id: string) {
        try {
            const response = await this.notion.dataSources.query({
                data_source_id: data_source_id,
            });
            return response.results.map((row: any) => flattenNotionProperties(row.properties));

        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
