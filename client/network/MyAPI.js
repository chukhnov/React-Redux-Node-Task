export const MyAPI = {
    sendData: function (obj) {
        function parseJSON(response) {
            return response.json()
        }

        return fetch('/api/1/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(parseJSON)
            .then(function (data) {
                if (data.username) {
                    console.log("Ok");
                }
                return data
            })
    }
};
