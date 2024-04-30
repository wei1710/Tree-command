const fs = require('fs');
const path = require('path');

function tree(dirPath, indent = '', isLast = true) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file, index) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        const isDirectory = stats.isDirectory();
        const isLastItem = index === files.length - 1;

        let line = '';

        if (isLast) {
            line += indent + '└── ';
        } else {
            line += indent + '├── ';
        }

        line += file;

        console.log(line);

        if (isDirectory) {
            const newIndent = isLast ? '    ' : '│   ';
            const newIsLast = isLastItem && !isLast;
            tree(filePath, indent + newIndent, newIsLast);
        }
    });
}

const targetDir = process.argv[2] || '.';
tree(targetDir);
