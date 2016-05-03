<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="font-size:17px;line-height:24px;color:#373737;background:#f9f9f9">
    <tbody>
    <tr>
        <td valign="top">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tbody>
                <tr>
                    <td valign="bottom" style="padding:20px 16px 12px">
                        <div>
                            <a href="https://www.evezown.com" target="_blank">
                                <img src="{{ asset('http://evezown.com/img/logo.png') }}">
                            </a>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    <tr>
        <td valign="top">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center">
                <tbody>
                <tr>
                    <td valign="top">
                        <div style="max-width:600px;margin:0 auto;padding:0 12px">
                            <div style="background:white;border-radius:0.5rem;padding:2rem;margin-bottom:1rem">
                                <h2 style="color:#2ab27b;margin:0 0 12px;line-height:30px">Hello {{ $buyerEmail }}</h2>

                                <p>Your order has been placed successfully.</p>

                                <p>You will hear from the Store shortly regarding your order.</p>

                                <p>Your order reference number is {{ $transactionCode }}</p>

                                <p>Please use this reference number for order tracking.</p>
                                
                                <p>Thank You</p>

                                <h4>Team EvezOwn</h4>

                            </div>

                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table>
</body>
</html>