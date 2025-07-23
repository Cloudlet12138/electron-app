import request from "@utils/request";
import { User } from "@api/type";



// 登录
export const loginByJson = (data: any): Promise<User> => {
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