import { publicAssetsURL } from '../../lib/config';

export const getAuthContainerTemplate = ({
  bodyContent,
}: {
  bodyContent: string;
}): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<table style="width: 100%; background: #ededed" cellspacing="0">
    <tr>
        <td style="padding:0px;">
            <!-- Content table -->
            <table width="600px" style="width: 600px" align="center" cellspacing="0">
                <!-- Content header -->
                <tr>
                    <td style="padding:0px;">
                        <table align="center" style="height: 114px; background: black; width: 100%">
                            <tr>
                                <td align="center">
                                    <img
                                            style="max-width: 200px"
                                            src="${publicAssetsURL}/public/email-template-logo.png"
                                         alt="MERNApp">
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <!-- Content header -->
                
                <!-- Content body -->
                <tr><td style="padding:0px">
                    ${bodyContent}
                </td></tr>
                <!-- Content body -->
                
                <!-- Content footer -->
                <tr>
                    <td style="padding: 50px;background-color: #ffffff;font-size: 14px; font-weight: 500;color: black; border: 1px solid #f7f7f7" align="center">
                        © 2024 MERN App. All Rights Reserved
                    </td>
                </tr>
                <!-- Content footer -->
            </table>
            <!-- Content table-->
        </td>
    </tr>
</table>
</body>
</html>
  `;
};
