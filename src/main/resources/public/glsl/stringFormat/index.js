if (!String.prototype.format) {
    String.prototype.format = function(map) {
        let res = this;
        map.forEach((v, k) => {
            let arg = "${" + k + "}";
            res = res.replaceAll(arg, v);
        });
        return res;
    }
}