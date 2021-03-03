const LocalStorageService = () => {
    let _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service;
        }

        return _service;
    }

    function _setToken(token) {
        sessionStorage.setItem("access_token", token.access_token);
    }

    function _getToken() {
        return sessionStorage.getItem("access_token");
    }

    function _clearToken() {
        sessionStorage.removeItem("access_token");
    }

    return {
        getService: _getService,
        setToken: _setToken,
        getToken: _getToken,
        clearToken: _clearToken,
    };
};

export default LocalStorageService();
