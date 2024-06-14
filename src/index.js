#! /usr/bin/env node

const { execSync } = require('child_process');

// Run mocha recursively over all modules
console.log('Run "npm test" for better formatted report');
console.log(execSync('mocha src/modules --recursive --timeout 1000000', { encoding: 'UTF-8' }));
