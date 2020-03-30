export default interface UserModel {
    name: string
}

export const UserModelFromJson = (json: any): UserModel => ({
    name: json.name
});
