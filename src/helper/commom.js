import generator from 'generate-password';

class Common {
    static async isValidData(thisModel, idIs) {
        const countIs = await thisModel.count({
            where: {
                id: idIs,
            },
        });
        return countIs > 0;
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
