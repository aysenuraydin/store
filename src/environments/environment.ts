import { CKEditorCloudConfig } from "@ckeditor/ckeditor5-angular";

export const environment = {
  production: false,
  ckeditor: {
    cloudConfig: {
      version: '44.1.0'
    } satisfies CKEditorCloudConfig,
    licenseKey: 'eyJleHAiOjE3MzYyOTQzOTksImp0aSI6IjVlMTEzZDM1LWU2MDYtNDBmZC1iYmE1LTAyOTdhODEwMjBlNCIsImxpY2Vuc2VkSG9zdHMiOlsiKi53ZWJjb250YWluZXIuaW8iLCIqLmpzaGVsbC5uZXQiLCIqLmNzcC5hcHAiLCJjZHBuLmlvIiwiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIiwic2giXSwibGljZW5zZVR5cGUiOiJldmFsdWF0aW9uIiwidmMiOiJiMDgyY2I1ZSJ9'
  }
};
