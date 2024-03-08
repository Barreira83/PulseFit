import ButtonDeleteUser from "../../components/ButtonDeleteUser/ButtonDeleteUser";
import ChangeRol from "../../components/ChangeRol/ChangeRol";
import FormRemoveUserByEmail from "../../components/FormRemoveUserByEmail/FormRemoveUserByEmail";
import UserForm from "../../components/UserForm/UserForm";
import "./AdminUserSetting.scss";

const AdminUserSetting = () => {
  return (
    <>
      <div className="main-container">
        <div className="container-modify-user">
          <UserForm />
        </div>
        <div className="second-container">
          <ChangeRol />
          <FormRemoveUserByEmail />
        </div>
        <ButtonDeleteUser />
      </div>
    </>
  );
};

export default AdminUserSetting;
