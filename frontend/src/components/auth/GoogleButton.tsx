import googleLogo from "@/img/logo/google-logo.svg"
import { signInWithGoogle } from "@/util/auth"

type GoogleButtonProps = {
  mode: "login" | "register"
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ mode }) => (
  <div className="flex justify-center items-stretch">
    <button type="button" className="gsi-material-button" onClick={signInWithGoogle}>
      <div className="gsi-material-button-state"></div>
      <div className="gsi-material-button-content-wrapper">
        <img src={googleLogo} alt="Google Icon" className="gsi-material-button-icon" />
        {mode === "login" && <span className="gsi-material-button-contents">Sign in with Google</span>}
        {mode === "register" && <span className="gsi-material-button-contents">Sign up with Google</span>}
      </div>
    </button>
  </div>
)

export default GoogleButton