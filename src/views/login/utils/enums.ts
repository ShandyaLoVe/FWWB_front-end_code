// import { $t } from "@/plugins/i18n";

const operates = [
  {
    // title: $t("login.purePhoneLogin")
    title: "手机登录"
  },
  {
    // title: $t("login.pureQRCodeLogin")
    title: "二维码登录"
  },
  {
    // title: $t("login.pureRegister")
    title: "注册"
  }
];

const thirdParty = [
  {
    // title: $t("login.pureWeChatLogin"),
    title: "微信登录",
    icon: "wechat"
  },
  {
    // title: $t("login.pureAlipayLogin"),
    title: "支付宝登录",
    icon: "alipay"
  },
  {
    // title: $t("login.pureQQLogin"),
    title: "QQ登录",
    icon: "qq"
  },
  {
    // title: $t("login.pureWeiBoLogin"),
    title: "微博登录",
    icon: "weibo"
  }
];

export { operates, thirdParty };
