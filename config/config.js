const GOOGLETTSSETTINGS =
{
    lang: 'ru-RU',
    rate: 1.0
}

const PIPERTTSSETTINGS = {
    onnxPath: "models/ru_RU-denis-medium.onnx",
    onnxJSONPath: "models/ru_RU-denis-medium.onnx.json",
    maxLength: 300
}

// Regex mapping for each supported language category
const REGEX_MAP = {
    russian: /\b[А-ЯЁа-яё\-]+\b/g,
    english: /\b[A-Za-z\-]+\b/g,
    swedish: /\b[A-Za-zåäöÅÄÖ\-]+\b/g
};
