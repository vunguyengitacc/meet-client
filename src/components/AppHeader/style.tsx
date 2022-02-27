import { makeStyles } from "@mui/styles";

const useAppHeaderStyle = makeStyles({
  surface: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoField: {
    paddingLeft: "5%",
    height: "80%",
    boxSizing: "border-box",
  },
  logo: {
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  configField: {
    display: "flex",
    alignItems: "center",
  },
  menuInforField: {
    boxSizing: "border-box",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
  },
  subMenuInfor: {
    position: "absolute",
    height: "80px",
    marginLeft: "-100px",
    backgroundColor: "#6c63ff",
    overflow: "hidden",
    transition: "width 0.1s",
  },
  menuAllMeetField: {
    boxSizing: "border-box",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
  },
  subMenuMeet: {
    position: "absolute",
    height: "80px",
    marginLeft: "-100px",
    backgroundColor: "#6c63ff",
    transition: "width 0.1s",
    overflow: "hidden",
  },
  menuLogoutField: {
    boxSizing: "border-box",
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
  },
  subMenuLogout: {
    height: "80px",
    marginLeft: "-100px",
    position: "absolute",
    backgroundColor: "#6c63ff",
    overflow: "hidden",
    transition: "width 0.1s",
  },
  desc: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    color: "white",
    paddingLeft: "10px",
  },
});

export default useAppHeaderStyle;
