function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import "regenerator-runtime/runtime";
import glob from "glob";
import path from "path";
import { promisify } from "util";
import { writeFileSync } from "fs";
import * as docgen from "react-docgen-typescript";
import mkdirp from "mkdirp";
import { propNames } from "@chakra-ui/styled-system";
var globAsync = promisify(glob);
var excludedPropNames = propNames.concat(["as", "apply", "sx", "__css", "css"]);
var rootDir = path.join(__dirname, "..", "..", "..", "..");
var sourcePath = path.join(rootDir, "packages");
var outputPath = path.join(__dirname, "..", "components");
var tsConfigPath = path.join(sourcePath, "..", "tsconfig.json");
export function main() {
  return _main.apply(this, arguments);
}

function _main() {
  _main = _asyncToGenerator(function* () {
    var componentFiles = yield findComponentFiles();

    if (componentFiles.length) {
      yield mkdirp(outputPath);
    }

    log("Parsing files for component types...");
    var parsedInfo = parseInfo(componentFiles);
    log("Extracting component info...");
    var componentInfo = extractComponentInfo(parsedInfo);
    log("Writing component info files...");
    writeComponentInfoFiles(componentInfo);
    log("Writing index files...");
    writeIndexCJS(componentInfo);
    writeIndexESM(componentInfo);
    log("Processed " + componentInfo.length + " components");
  });
  return _main.apply(this, arguments);
}

if (require.main === module) {
  // run main function if called via cli
  main().catch(console.error);
}
/**
 * Find all TypeScript files which could contain component definitions
 */


function findComponentFiles() {
  return _findComponentFiles.apply(this, arguments);
}
/**
 * Parse files with react-doc-gen-typescript
 */


function _findComponentFiles() {
  _findComponentFiles = _asyncToGenerator(function* () {
    var tsFiles = yield globAsync("react/**/src/**/*.@(ts|tsx)", {
      cwd: sourcePath
    });
    return tsFiles.filter(f => !f.includes("stories"));
  });
  return _findComponentFiles.apply(this, arguments);
}

function parseInfo(filePaths) {
  var {
    parse
  } = docgen.withCustomConfig(tsConfigPath, {
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop, component) => {
      var _prop$parent$fileName, _prop$parent, _prop$parent$fileName2, _prop$parent2;

      var isStyledSystemProp = excludedPropNames.includes(prop.name);
      var isHTMLElementProp = (_prop$parent$fileName = (_prop$parent = prop.parent) == null ? void 0 : _prop$parent.fileName.includes("node_modules")) != null ? _prop$parent$fileName : false;
      var isHook = component.name.startsWith("use");
      var isTypeScriptNative = (_prop$parent$fileName2 = (_prop$parent2 = prop.parent) == null ? void 0 : _prop$parent2.fileName.includes("node_modules/typescript")) != null ? _prop$parent$fileName2 : false;
      return isHook && !isTypeScriptNative || !(isStyledSystemProp || isHTMLElementProp);
    }
  });
  return filePaths.flatMap(file => {
    var absoluteFilePath = path.join(sourcePath, file);
    return parse(absoluteFilePath);
  });
}
/**
 * Extract meta data of component docs
 */


function extractComponentInfo(docs) {
  return docs.reduce((acc, def) => {
    if (!Object.keys(def.props || {}).length) {
      return acc;
    }

    function createUniqueName(displayName) {
      var existing = acc.filter(prev => String(prev.def.displayName).toLowerCase() === displayName.toLowerCase());

      if (!existing.length) {
        return displayName;
      }

      return "" + displayName + existing.length;
    }

    var exportName = createUniqueName(def.displayName);
    var fileName = exportName + ".json";
    acc.push({
      def,
      displayName: def.displayName,
      fileName,
      exportName,
      importPath: "../components/" + fileName
    });
    return acc;
  }, []);
}
/**
 * Write component info as JSON to disk
 */


function writeComponentInfoFiles(componentInfo) {
  for (var info of componentInfo) {
    var filePath = path.join(outputPath, info.fileName);
    var content = JSON.stringify(info.def);
    writeFileSync(filePath, content);
  }
}
/**
 * Create and write the index file in CJS format
 */


function writeIndexCJS(componentInfo) {
  var cjsIndexFilePath = path.join(__dirname, "index.js");
  var cjsExports = componentInfo.map((_ref) => {
    var {
      displayName,
      importPath
    } = _ref;
    return "module.exports['" + displayName + "'] = require('" + importPath + "')";
  });
  writeFileSync(cjsIndexFilePath, cjsExports.join("\n"));
}
/**
 * Create and write the index file in ESM format
 */


function writeIndexESM(componentInfo) {
  var esmIndexFilePath = path.join(__dirname, "..", "esm", "index.js");
  var esmPropImports = componentInfo.map((_ref2) => {
    var {
      exportName,
      importPath
    } = _ref2;
    return "import " + exportName + "Import from '" + importPath + "'";
  }).join("\n");
  var esmPropExports = componentInfo.map((_ref3) => {
    var {
      exportName
    } = _ref3;
    return "export const " + exportName + " = " + exportName + "Import";
  }).join("\n");
  writeFileSync(esmIndexFilePath, esmPropImports + "\n" + esmPropExports);
}

function log() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  console.info("[props-docs]", ...args);
}
//# sourceMappingURL=build.js.map