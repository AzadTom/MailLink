import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { flattenNotionProperties } from './utils/notion.utils';

@Injectable()
export class NotionService {
    private notion = new Client({ auth: process.env.NOTION_SECRET });


    async getDBEmailMessageList(data_source_id: string) {
        try {
            const response = await this.notion.dataSources.query({
                data_source_id: data_source_id,
            });
            return response.results.map((row: any) => flattenNotionProperties(row.properties));

        } catch (error) {
            console.log(error);
            throw new error;
        }
    }
    async getDBEmailList(dataSourcesId: string, cursor?: string, limit?: number, start?: number, end?: number, select?: string) {
        try {
            const response = await this.notion.dataSources.query({
                data_source_id: dataSourcesId,
                start_cursor: cursor,
                page_size: limit ? limit : undefined,
                sorts: [{
                    direction: "descending",
                    property: "Created Date",
                }],
                filter: {
                    and: [
                        {
                            property: "email",
                            email: { is_not_empty: true },
                        },
                        ...(select
                            ? [{
                                property: "select",
                                select: { equals: select },
                            }]
                            : []),
                    ],
                }

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
}