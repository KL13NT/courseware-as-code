const path = require('path')

const fs = jest.createMockFromModule('fs')

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create({})
function __setMockFiles(newMockFiles) {
	mockFiles = Object.create({})
	for (const file of Object.keys(newMockFiles)) {
		mockFiles[file] = newMockFiles[file]
	}
}

let mockDirectories = Object.create({})
function __setMockDirectories(newMockDirectories) {
	mockDirectories = Object.create({})
	for (const file in newMockDirectories) {
		const dir = path.dirname(file)

		if (!mockDirectories[dir]) {
			mockDirectories[dir] = []
		}
		mockDirectories[dir].push(path.basename(file))
	}
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
	return mockDirectories[directoryPath] || []
}

function readFileSync(filePath) {
	return mockFiles[filePath]
}

function existsSync(filePath) {
	return Boolean(mockFiles[filePath])
}

fs.__setMockFiles = __setMockFiles
fs.__setMockDirectories = __setMockDirectories
fs.readdirSync = readdirSync
fs.existsSync = existsSync
fs.readFileSync = readFileSync

module.exports = fs
