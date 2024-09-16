
import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superAdmin = {
  id: "A-0001",
  password: config.super__admin__password,
  email: "rashidaakterchadni@gmail.com",
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });
  console.log(isSuperAdminExits);
  if (!isSuperAdminExits) {
    const result = await User.create(superAdmin);
    console.log(result);
  }
};

export default seedSuperAdmin;
