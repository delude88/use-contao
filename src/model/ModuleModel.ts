export default interface ModuleModel {
    id: number
}

export const ModuleModelFromJson = (json: any): ModuleModel => json as ModuleModel;

export const ModuleModelFromJson2 = (json: any): ModuleModel => ({
    id: parseInt(json.id)
});
