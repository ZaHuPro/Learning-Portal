import generator from 'generate-password';

class Common {
    static async isValidData(thisModel, idIs) {
        return await thisModel.count({
            where: {
                id: idIs,
            },
        }) > 0;
    }

    static async randomGenerator(size) {
        const returnData = await generator.generate({
            length: size,
            uppercase: true,
            numbers: true,
            exclude: true,
            excludeSimilarCharacters: true,
        });
        return returnData;
    }
}

export default Common;
