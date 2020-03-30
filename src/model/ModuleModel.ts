export default interface ModuleModel {
    id: number
}

export const ModuleModelFromJson = (json: any): ModuleModel => ({
    id: parseInt(json.id)
});
