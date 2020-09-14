const nodemailer = require('nodemailer');

async function sendMail(taskList, user, pass) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user,
            pass,
        },
    });

    const todayDate = new Date();
    let info = await transporter.sendMail({
        from: 'hemant.rajpoot@unthinkable.co',
        to: 'hemant.rajpoot@unthinkable.co',
        subject: `Daily Status Report - ${todayDate.getDate()} ${todayDate.toLocaleString(
            'default',
            { month: 'long' }
        )} ${todayDate.getFullYear()}`, // Subject line
        text: '', // plain text body
        html: `<div>
        <div dir="ltr">
            <div><br clear="all" /></div>
            <div>
                <div dir="ltr" align="left" style="margin-left: 0pt">
                    <span
                        ><div dir="ltr" align="left" style="margin-left: 0pt">
                            <span
                                ><div
                                    dir="ltr"
                                    align="left"
                                    style="margin-left: 0pt"
                                >
                                    <table
                                        style="
                                            border: none;
                                            border-collapse: collapse;
                                        "
                                    >
                                        <tbody>
                                            <tr style="height: 20.25pt">
                                                <td
                                                    colspan="5"
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(
                                                                204,
                                                                204,
                                                                204
                                                            )
                                                            rgb(204, 204, 204)
                                                            rgb(0, 0, 0);
                                                        vertical-align: bottom;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            text-align: center;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Today's Tasks</span
                                                        >
                                                    </p>
                                                </td>
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(
                                                                204,
                                                                204,
                                                                204
                                                            )
                                                            rgb(204, 204, 204)
                                                            rgb(0, 0, 0);
                                                        vertical-align: bottom;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <br />
                                                </td>
                                            </tr>
                                            <tr style="height: 36.75pt">
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(0, 0, 0);
                                                        vertical-align: top;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            text-align: center;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Sl. No.</span
                                                        >
                                                    </p>
                                                </td>
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(0, 0, 0);
                                                        vertical-align: top;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Task Description
                                                        </span>
                                                    </p>
                                                </td>
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(0, 0, 0);
                                                        vertical-align: top;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            text-align: center;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Status</span
                                                        >
                                                    </p>
                                                </td>
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(0, 0, 0);
                                                        vertical-align: top;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Dependencies/Blockers/Comments</span
                                                        >
                                                    </p>
                                                </td>
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(0, 0, 0);
                                                        vertical-align: top;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            text-align: center;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Completion %</span
                                                        >
                                                    </p>
                                                </td>
                                                <td
                                                    style="
                                                        border-width: 0.75pt;
                                                        border-style: solid;
                                                        border-color: rgb(0, 0, 0);
                                                        vertical-align: top;
                                                        background-color: rgb(
                                                            31,
                                                            73,
                                                            125
                                                        );
                                                        padding: 2pt;
                                                        overflow: hidden;
                                                    "
                                                >
                                                    <p
                                                        dir="ltr"
                                                        style="
                                                            line-height: 1.656;
                                                            text-align: center;
                                                            margin-top: 0pt;
                                                            margin-bottom: 0pt;
                                                        "
                                                    >
                                                        <span
                                                            style="
                                                                font-size: 10pt;
                                                                font-family: Arial;
                                                                color: rgb(
                                                                    255,
                                                                    255,
                                                                    255
                                                                );
                                                                background-color: transparent;
                                                                font-weight: 700;
                                                                font-variant-numeric: normal;
                                                                font-variant-east-asian: normal;
                                                                vertical-align: baseline;
                                                                white-space: pre-wrap;
                                                            "
                                                            >Hours</span
                                                        >
                                                    </p>
                                                </td>
                                            </tr>
                                            <!-- email entry -->
                                            ${taskList.reduce(
                                                (
                                                    str,
                                                    {
                                                        duration,
                                                        title,
                                                        index,
                                                        status,
                                                        percentage,
                                                    }
                                                ) =>
                                                    str +
                                                    `<tr style="height: 27pt">
                                            <td
                                                style="
                                                    border-width: 0.75pt;
                                                    border-style: solid;
                                                    border-color: rgb(0, 0, 0);
                                                    vertical-align: top;
                                                    padding: 2pt;
                                                "
                                            >
                                                <p
                                                    dir="ltr"
                                                    style="
                                                        line-height: 1.656;
                                                        text-align: center;
                                                        margin-top: 0pt;
                                                        margin-bottom: 0pt;
                                                        text-align: center;
                                                    "
                                                >
                                                    <span
                                                        style="
                                                            font-size: 10pt;
                                                            font-family: Arial;
                                                            color: rgb(0, 0, 0);
                                                            background-color: transparent;
                                                            font-variant-numeric: normal;
                                                            font-variant-east-asian: normal;
                                                            vertical-align: baseline;
                                                            white-space: pre-wrap;
                                                        "
                                                        >${index + 1}</span
                                                    >
                                                </p>
                                            </td>
                                            <td
                                                style="
                                                    border-width: 0.75pt;
                                                    border-style: solid;
                                                    border-color: rgb(0, 0, 0);
                                                    vertical-align: top;
                                                    padding: 2pt;
                                                    overflow: hidden;
                                                "
                                            >
                                                <p
                                                    dir="ltr"
                                                    style="
                                                        line-height: 1.38;
                                                        margin-top: 0pt;
                                                        margin-bottom: 0pt;
                                                        text-align: center;
                                                    "
                                                >
                                                    <span
                                                        style="
                                                            font-size: 10pt;
                                                            font-family: Arial;
                                                            color: rgb(0, 0, 0);
                                                            background-color: transparent;
                                                            font-variant-numeric: normal;
                                                            font-variant-east-asian: normal;
                                                            vertical-align: baseline;
                                                            white-space: pre-wrap;
                                                            text-align: center;
                                                        "
                                                    >${title.trim()}</span
                                                    >
                                                </p>
                                            </td>
                                            <td
                                                style="
                                                    border-width: 0.75pt;
                                                    border-style: solid;
                                                    border-color: rgb(0, 0, 0);
                                                    vertical-align: top;
                                                    padding: 2pt;
                                                    overflow: hidden;
                                                "
                                            >
                                                <p
                                                    dir="ltr"
                                                    style="
                                                        line-height: 1.656;
                                                        text-align: center;
                                                        margin-top: 0pt;
                                                        margin-bottom: 0pt;
                                                        text-align: center;
                                                    "
                                                >
                                                    <span
                                                        style="
                                                            font-size: 10pt;
                                                            font-family: Arial;
                                                            color: rgb(0, 0, 0);
                                                            background-color: transparent;
                                                            font-variant-numeric: normal;
                                                            font-variant-east-asian: normal;
                                                            vertical-align: baseline;
                                                            white-space: pre-wrap;
                                                            text-align: center;
                                                        "
                                                        >${
                                                            status || 'Done'
                                                        }</span
                                                    >
                                                </p>
                                            </td>
                                            <td
                                                style="
                                                    border-width: 0.75pt;
                                                    border-style: solid;
                                                    border-color: rgb(0, 0, 0);
                                                    vertical-align: top;
                                                    padding: 2pt;
                                                    overflow: hidden;
                                                "
                                            >
                                                <br />
                                            </td>
                                            <td
                                                style="
                                                    border-width: 0.75pt;
                                                    border-style: solid;
                                                    border-color: rgb(0, 0, 0);
                                                    vertical-align: top;
                                                    padding: 2pt;
                                                    overflow: hidden;
                                                "
                                            >
                                           
                                    
                                            <p
                                                dir="ltr"
                                                style="
                                                    line-height: 1.656;
                                                    text-align: center;
                                                    margin-top: 0pt;
                                                    margin-bottom: 0pt;
                                                    text-align: center;
                                                "
                                            >
                                                <span
                                                    style="
                                                        font-size: 10pt;
                                                        font-family: Arial;
                                                        color: rgb(0, 0, 0);
                                                        background-color: transparent;
                                                        font-variant-numeric: normal;
                                                        font-variant-east-asian: normal;
                                                        vertical-align: baseline;
                                                        white-space: pre-wrap;
                                                        text-align: center;
                                                    "
                                                    >${Math.floor(
                                                        percentage
                                                    )}</span
                                                >
                                            </p>
                                       
                                            </td>
                                            <td
                                                style="
                                                    border-width: 0.75pt;
                                                    border-style: solid;
                                                    border-color: rgb(0, 0, 0);
                                                    vertical-align: top;
                                                    padding: 2pt;
                                                    overflow: hidden;
                                                "
                                            >
                                                <p
                                                    dir="ltr"
                                                    style="
                                                        line-height: 1.656;
                                                        text-align: center;
                                                        margin-top: 0pt;
                                                        margin-bottom: 0pt;
                                                        text-align: center;
                                                    "
                                                >
                                                    <span
                                                        style="
                                                            font-size: 10pt;
                                                            font-family: Arial;
                                                            color: rgb(0, 0, 0);
                                                            background-color: transparent;
                                                            font-variant-numeric: normal;
                                                            font-variant-east-asian: normal;
                                                            vertical-align: baseline;
                                                            white-space: pre-wrap;
                                                            text-align: center;
                                                        "
                                                        >${duration}</span
                                                    >
                                                </p>
                                            </td>
                                        </tr>
                                      `,
                                                ''
                                            )}
                                            <!-- email entry -->
                                        </tbody>
                                    </table>
                                </div></span
                            >
                        </div></span
                    >
                </div>
                <p
                    dir="ltr"
                    style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt"
                >
                    <br />
                </p>
                <div dir="ltr" align="left" style="margin-left: 0pt">
                    <table style="border: none; border-collapse: collapse">
                        <colgroup>
                            <col width="47" />
                            <col width="272" />
                            <col width="274" />
                            <col width="33" />
                        </colgroup>
                        <tbody>
                            <tr style="height: 20.25pt">
                                <td
                                    colspan="4"
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(204, 204, 204)
                                            rgb(204, 204, 204) rgb(0, 0, 0);
                                        vertical-align: bottom;
                                        background-color: rgb(31, 73, 125);
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <p
                                        dir="ltr"
                                        style="
                                            line-height: 1.656;
                                            text-align: center;
                                            margin-top: 0pt;
                                            margin-bottom: 0pt;
                                        "
                                    >
                                        <span
                                            style="
                                                font-size: 10pt;
                                                font-family: Arial;
                                                color: rgb(255, 255, 255);
                                                background-color: transparent;
                                                font-weight: 700;
                                                font-variant-numeric: normal;
                                                font-variant-east-asian: normal;
                                                vertical-align: baseline;
                                                white-space: pre-wrap;
                                            "
                                            >Tomorrow's Tasks</span
                                        >
                                    </p>
                                </td>
                            </tr>
                            <tr style="height: 36.75pt">
                                <td
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        background-color: rgb(31, 73, 125);
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <p
                                        dir="ltr"
                                        style="
                                            line-height: 1.656;
                                            text-align: center;
                                            margin-top: 0pt;
                                            margin-bottom: 0pt;
                                        "
                                    >
                                        <span
                                            style="
                                                font-size: 10pt;
                                                font-family: Arial;
                                                color: rgb(255, 255, 255);
                                                background-color: transparent;
                                                font-weight: 700;
                                                font-variant-numeric: normal;
                                                font-variant-east-asian: normal;
                                                vertical-align: baseline;
                                                white-space: pre-wrap;
                                            "
                                            >Sl. No.</span
                                        >
                                    </p>
                                </td>
                                <td
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        background-color: rgb(31, 73, 125);
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <p
                                        dir="ltr"
                                        style="
                                            line-height: 1.656;
                                            margin-top: 0pt;
                                            margin-bottom: 0pt;
                                        "
                                    >
                                        <span
                                            style="
                                                font-size: 10pt;
                                                font-family: Arial;
                                                color: rgb(255, 255, 255);
                                                background-color: transparent;
                                                font-weight: 700;
                                                font-variant-numeric: normal;
                                                font-variant-east-asian: normal;
                                                vertical-align: baseline;
                                                white-space: pre-wrap;
                                            "
                                            >Task Description</span
                                        >
                                    </p>
                                </td>
                                <td
                                    colspan="2"
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        background-color: rgb(31, 73, 125);
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <p
                                        dir="ltr"
                                        style="
                                            line-height: 1.656;
                                            margin-top: 0pt;
                                            margin-bottom: 0pt;
                                        "
                                    >
                                        <span
                                            style="
                                                font-size: 10pt;
                                                font-family: Arial;
                                                color: rgb(255, 255, 255);
                                                background-color: transparent;
                                                font-weight: 700;
                                                font-variant-numeric: normal;
                                                font-variant-east-asian: normal;
                                                vertical-align: baseline;
                                                white-space: pre-wrap;
                                            "
                                            >Dependencies/Blockers/Comments</span
                                        >
                                    </p>
                                </td>
                            </tr>
                            <tr style="height: 30.75pt">
                                <td
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <p
                                        dir="ltr"
                                        style="
                                            line-height: 1.656;
                                            text-align: center;
                                            margin-top: 0pt;
                                            margin-bottom: 0pt;
                                        "
                                    >
                                        1
                                    </p>
                                </td>
                                <td
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    [XERO-15]: code-migration:get payment<font
                                        color="#888888"
                                        ><font color="#888888"
                                            ><font color="#888888"
                                                ><font color="#888888"
                                                    ><font color="#888888"
                                                        ><p
                                                            dir="ltr"
                                                            style="
                                                                line-height: 1.656;
                                                                text-align: center;
                                                                margin-top: 0pt;
                                                                margin-bottom: 0pt;
                                                            "
                                                        ></p>
                                                        <p
                                                            dir="ltr"
                                                            style="
                                                                line-height: 1.656;
                                                                text-align: center;
                                                                margin-top: 0pt;
                                                                margin-bottom: 0pt;
                                                            "
                                                        ></p>
                                                        <p
                                                            dir="ltr"
                                                            style="
                                                                line-height: 1.38;
                                                                margin-top: 0pt;
                                                                margin-bottom: 0pt;
                                                            "
                                                        ></p></font></font></font></font
                                    ></font>
                                </td>
                                <td
                                    colspan="2"
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <br />
                                </td>
                            </tr>
                            <tr style="height: 30.75pt">
                                <td
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <p
                                        dir="ltr"
                                        style="
                                            line-height: 1.656;
                                            text-align: center;
                                            margin-top: 0pt;
                                            margin-bottom: 0pt;
                                        "
                                    >
                                        <br />
                                    </p>
                                </td>
                                <td
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <br />
                                </td>
                                <td
                                    colspan="2"
                                    style="
                                        border-width: 0.75pt;
                                        border-style: solid;
                                        border-color: rgb(0, 0, 0);
                                        vertical-align: top;
                                        padding: 2pt;
                                        overflow: hidden;
                                    "
                                >
                                    <br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <font color="#888888"
                    ><font color="#888888"
                        ><font color="#888888"
                            ><font color="#888888"
                                ><div><br /></div></font></font></font
                ></font>
            </div>
            <font color="#888888"
                >-- <br />
                <div dir="ltr" data-smartmail="gmail_signature">
                    <div dir="ltr">Hemant Rajpoot<br />Employ ID:APS-30099</div>
                </div></font
            >
        </div>
        <div></div>
        <div></div>
    </div>
    `, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendMail;
