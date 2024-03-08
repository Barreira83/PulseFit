import ButtonDeleteUser from "../../components/ButtonDeleteUser/ButtonDeleteUser";
import UserForm from "../../components/UserForm/UserForm";
import "./SettingsPage.scss";

const SettingsPage = () => {
  return (
    <>
      <div className="user-container">
        <UserForm />
        <div>
          <ButtonDeleteUser />
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
