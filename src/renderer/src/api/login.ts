import request from "@utils/request";
import { ILoginRequest } from "@api/type";



// 登录
export const loginByJson = (data: any): Promise<ILoginRequest> => {
  return request(
    {
      url: "/u/loginByJson",
      method: "POST",
      data
    }
  );
};

// 图形验证码
export const captchaImage = (params: { key: string }): Promise<ArrayBuffer> => {

  return request(
    {
      url: "/captcha/image",
      method: "GET",
      responseType: "arraybuffer",
      params
    }
  );
};

// 发送验证码
export const loginCaptcha = (params: { mobile: string }): Promise<ILoginRequest> => {
  return request(
    {
      url: "/captcha/sendRegisterOrLoginCaptcha",
      method: "get",
      params
    }
  );
};

// 验证码登录
export const loginByMobile = (data: any): Promise<ILoginRequest> => {
  return request(
    {
      url: "/u/loginByMobile",
      method: "POST",
      data
    }
  );
};
