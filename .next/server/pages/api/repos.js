"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/repos";
exports.ids = ["pages/api/repos"];
exports.modules = {

/***/ "isomorphic-unfetch":
/*!*************************************!*\
  !*** external "isomorphic-unfetch" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("isomorphic-unfetch");

/***/ }),

/***/ "(api)/./pages/api/repos.jsx":
/*!*****************************!*\
  !*** ./pages/api/repos.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst fetch = __webpack_require__(/*! isomorphic-unfetch */ \"isomorphic-unfetch\");\nconst GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    try {\n        const response = await fetch(\"https://api.github.com/users/itsmrnatural/repos\", {\n            headers: {\n                Authorization: `Bearer ${GITHUB_API_TOKEN}`,\n                \"Content-Type\": \"application/json\"\n            }\n        });\n        if (!response.ok) {\n            throw new Error(`GitHub API returned ${response.status} status code`);\n        }\n        const repositories = await response.json();\n        res.send([\n            ...repositories\n        ]);\n    } catch (error) {\n        console.error(error);\n        res.status(500).send(\"Internal Server Error\");\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcmVwb3MuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxLQUFLLENBQUNBLEtBQUssR0FBR0MsbUJBQU8sQ0FBQyw4Q0FBb0I7QUFFMUMsS0FBSyxDQUFDQyxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDQyxHQUFHLENBQUNGLGdCQUFnQjtBQUVyRCxpRUFBTSxPQUFnQkcsR0FBRyxFQUFFQyxHQUFHLEdBQUssQ0FBQztJQUNsQyxHQUFHLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQ0MsUUFBUSxHQUFHLEtBQUssQ0FBQ1AsS0FBSyxDQUMxQixDQUFpRCxrREFDakQsQ0FBQztZQUNDUSxPQUFPLEVBQUUsQ0FBQztnQkFDUkMsYUFBYSxHQUFHLE9BQU8sRUFBRVAsZ0JBQWdCO2dCQUN6QyxDQUFjLGVBQUUsQ0FBa0I7WUFDcEMsQ0FBQztRQUNILENBQUM7UUFHSCxFQUFFLEdBQUdLLFFBQVEsQ0FBQ0csRUFBRSxFQUFFLENBQUM7WUFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQ0MsS0FBSyxFQUFFLG9CQUFvQixFQUFFSixRQUFRLENBQUNLLE1BQU0sQ0FBQyxZQUFZO1FBQ3JFLENBQUM7UUFFRCxLQUFLLENBQUNDLFlBQVksR0FBRyxLQUFLLENBQUNOLFFBQVEsQ0FBQ08sSUFBSTtRQUN4Q1IsR0FBRyxDQUFDUyxJQUFJLENBQUMsQ0FBQztlQUFHRixZQUFZO1FBQUEsQ0FBQztJQUM1QixDQUFDLENBQUMsS0FBSyxFQUFFRyxLQUFLLEVBQUUsQ0FBQztRQUNmQyxPQUFPLENBQUNELEtBQUssQ0FBQ0EsS0FBSztRQUNuQlYsR0FBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxFQUFFRyxJQUFJLENBQUMsQ0FBdUI7SUFDOUMsQ0FBQztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC8uL3BhZ2VzL2FwaS9yZXBvcy5qc3g/MWEyMiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmZXRjaCA9IHJlcXVpcmUoXCJpc29tb3JwaGljLXVuZmV0Y2hcIik7XG5cbmNvbnN0IEdJVEhVQl9BUElfVE9LRU4gPSBwcm9jZXNzLmVudi5HSVRIVUJfQVBJX1RPS0VOO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgXCJodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzL2l0c21ybmF0dXJhbC9yZXBvc1wiLFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke0dJVEhVQl9BUElfVE9LRU59YCxcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBHaXRIdWIgQVBJIHJldHVybmVkICR7cmVzcG9uc2Uuc3RhdHVzfSBzdGF0dXMgY29kZWApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcG9zaXRvcmllcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICByZXMuc2VuZChbLi4ucmVwb3NpdG9yaWVzXSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIik7XG4gIH1cbn07XG4iXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1aXJlIiwiR0lUSFVCX0FQSV9UT0tFTiIsInByb2Nlc3MiLCJlbnYiLCJyZXEiLCJyZXMiLCJyZXNwb25zZSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwib2siLCJFcnJvciIsInN0YXR1cyIsInJlcG9zaXRvcmllcyIsImpzb24iLCJzZW5kIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/repos.jsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/repos.jsx"));
module.exports = __webpack_exports__;

})();