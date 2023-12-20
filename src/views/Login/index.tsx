import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { handleLogin } from "@/api";
import Cookies from "js-cookie";
import style from "./index.module.css";

console.log(process.env.NODE_ENV);
const Login = () => {
  const [authType, setAuthType] = useState("userName");
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  const { clientId, secret, redirectUri } = router.query;
  const handleSubmit = async (param: any) => {
    console.log("param--------", param);
    const { userName, passWord } = param;
    const { data }: any = await handleLogin({
      secret: secret,
      redirectUri: redirectUri,
      userName,
      passWord,
      authType: authType,
      clientId: clientId,
    });
    const { redirectUri: callbackUrl } = data || {};
    window.location.replace(callbackUrl);
  };

  useEffect(() => {
    setVisible(true);
    Cookies.set("appTag", "authWeb");
  }, []);

  return visible ? (
    <section className={style.contain}>
      <section className={style.contain_innerContain}>
        <header className={style.innerContain_header}>Oauth认证中心</header>
        <section className={style.contain_form}>
          <Form
            name="normal_login"
            className={style.form}
            initialValues={userInfo as any}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="userName"
              initialValue="lceihen"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="passWord"
              initialValue="lc9800481"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <section className={style.form_item_remember}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </section>
            <div className={style.btn_contain}>
              <Button
                type="primary"
                htmlType="submit"
                className={style.btn_submit}
              >
                Log in
              </Button>
            </div>
            <Form.Item>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </section>
      </section>
    </section>
  ) : null;
};
export default Login;
