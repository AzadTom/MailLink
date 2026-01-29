export function extractNotionValue(prop: any) {
    if (!prop) return null;

    switch (prop.type) {
        case 'title':
            return prop.title?.map((t: any) => t.plain_text).join('') || null;

        case 'rich_text':
            return prop.rich_text?.map((t: any) => t.plain_text).join('') || null;

        case 'email':
            return prop.email ?? null;

        case 'number':
            return prop.number ?? null;

        case 'created_time':
            return prop.created_time ?? null;

        case 'url':
            return prop.url ?? null;

        case 'phone_number':
            return prop.phone_number ?? null;

        case 'select':
            return prop.select?.name ?? null;

        case 'multi_select':
            return prop.multi_select?.map((s: any) => s.name) ?? [];

        case 'checkbox':
            return prop.checkbox ?? false;

        default:
            return null;
    }
}

export function flattenNotionProperties(properties: Record<string, any>) {
    const flat: Record<string, any> = {};

    for (const key in properties) {
        flat[key] = extractNotionValue(properties[key]);
    }

    return flat;
}