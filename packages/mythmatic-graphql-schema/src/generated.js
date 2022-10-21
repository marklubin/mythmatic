"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetRenderTaskLazyQuery = exports.useGetRenderTaskQuery = exports.GetRenderTaskDocument = exports.useStartRenderTaskMutation = exports.StartRenderTaskDocument = exports.Sort = exports.RenderTaskStatus = void 0;
var client_1 = require("@apollo/client");
var Apollo = __importStar(require("@apollo/client"));
var defaultOptions = {};
var RenderTaskStatus;
(function (RenderTaskStatus) {
    RenderTaskStatus["Completed"] = "Completed";
    RenderTaskStatus["Created"] = "Created";
    RenderTaskStatus["Failed"] = "Failed";
    RenderTaskStatus["Processing"] = "Processing";
})(RenderTaskStatus = exports.RenderTaskStatus || (exports.RenderTaskStatus = {}));
var Sort;
(function (Sort) {
    Sort["Asc"] = "asc";
    Sort["Desc"] = "desc";
})(Sort = exports.Sort || (exports.Sort = {}));
exports.StartRenderTaskDocument = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation StartRenderTask($input: RenderTaskInput!) {\n  startRenderTask(input: $input) {\n    id\n    status\n  }\n}\n    "], ["\n    mutation StartRenderTask($input: RenderTaskInput!) {\n  startRenderTask(input: $input) {\n    id\n    status\n  }\n}\n    "])));
/**
 * __useStartRenderTaskMutation__
 *
 * To run a mutation, you first call `useStartRenderTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartRenderTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startRenderTaskMutation, { data, loading, error }] = useStartRenderTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
function useStartRenderTaskMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.StartRenderTaskDocument, options);
}
exports.useStartRenderTaskMutation = useStartRenderTaskMutation;
exports.GetRenderTaskDocument = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    query GetRenderTask($taskId: String!) {\n  getRenderTask(taskId: $taskId) {\n    id\n    status\n    payloadUrl\n    errorMessage\n  }\n}\n    "], ["\n    query GetRenderTask($taskId: String!) {\n  getRenderTask(taskId: $taskId) {\n    id\n    status\n    payloadUrl\n    errorMessage\n  }\n}\n    "])));
/**
 * __useGetRenderTaskQuery__
 *
 * To run a query within a React component, call `useGetRenderTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRenderTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRenderTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
function useGetRenderTaskQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetRenderTaskDocument, options);
}
exports.useGetRenderTaskQuery = useGetRenderTaskQuery;
function useGetRenderTaskLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetRenderTaskDocument, options);
}
exports.useGetRenderTaskLazyQuery = useGetRenderTaskLazyQuery;
var templateObject_1, templateObject_2;
//# sourceMappingURL=generated.js.map