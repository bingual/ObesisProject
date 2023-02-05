export function parseErrorMessages(fieldsErrorMessages) {
    // entries : key, value를 한쌍의 배열로 반환해줌
    // reduce : 첫번째 인자로 결과를 누적할 변수, 두번째로 누적할 시킬 값을 변수를 받음
    return Object.entries(fieldsErrorMessages).reduce(
        (acc, [fieldName, errors]) => {
            if (
                typeof fieldsErrorMessages === 'string' ||
                typeof fieldsErrorMessages === 'object'
            ) {
                acc[fieldName] = {
                    validateStatus: 'error',
                    help: errors,
                };
            } else {
                acc[fieldName] = {
                    validateStatus: 'error',
                    help: errors.join(),
                };
            }
            return acc;
        },
        {}, // 빈 오브젝트를 만들고 안에 결과를 누적시키겠다.,
    );
}
