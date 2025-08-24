import InputOTPForm, {
  InputOTPFormData,
} from "../../_components/input-otp-form";

interface TwoFactorAuthenticationProps {
  email: string;
  onSubmitOTPHandler: (data: InputOTPFormData) => Promise<void>;
}

export default function TwoFactorAuthentication(
  props: TwoFactorAuthenticationProps
) {
  return (
    <>
      <InputOTPForm email={props.email} onSubmit={props.onSubmitOTPHandler} />
    </>
  );
}
