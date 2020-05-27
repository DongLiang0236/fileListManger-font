export default (http) => {
    return {
        /**
         * 查询树列表
         * @param data
         * @return {*}
         */
        queryFileList(data) {
            return http.json({
                url: '/api/file/fileTree',
                data
            })
        },
    }
}
