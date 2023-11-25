import requestPromise from "request-promise";

export default class OpenaiAutomod {
    constructor(openaiKey) {
        this.openaiKey = openaiKey || undefined;
    }

    async runAutomod(input) {
        const friendlyTags = {
            'sexual': "Sexual Content",
            'hate': 'Hate Speech',
            'violence': 'Violence',
            'self-harm': "Self-Harm",
            'sexual/minors': 'Child Endangerment',
            'hate/threatening': 'Threatening',
            'violence/graphic': 'Graphic Violence'
        };

        let results;

        try {
            const response = await requestPromise.post({
                url: 'https://api.openai.com/v1/moderations',
                headers: {
                    'Authorization': `Bearer ${this.openaiKey}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    input: input
                })
            });

            const parsedResponseBody = JSON.parse(response);

            if (parsedResponseBody.results[0].flagged === true) {
                let sortedEntries = Object.entries(parsedResponseBody.results[0].categories).sort((a, b) => b[0] - a[0]);

                let value;
                for (let i = 0; i < sortedEntries.length; i++) {
                    if (sortedEntries[i][1] == true) {
                        value = sortedEntries[i][0];
                    }
                }

                results = {
                    isFlagged: parsedResponseBody.results[0].flagged,
                    sortedEntities: sortedEntries,
                    friendlyTags: friendlyTags[value]
                };
            } else {
                results = {
                    isFlagged: parsedResponseBody.results[0].flagged,
                };
            }
        } catch (error) {
            console.log("Error Occurred: ", error);
        }

        return results;
    }
}
