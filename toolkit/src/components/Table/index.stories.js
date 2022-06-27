import React, { useMemo } from "react";
import { useTable } from "./index";
import { data, columns } from "./example/const";
import StyledTh from "./example/header";
var Table = function (_a) {
    var _columns = _a._columns, _data = _a._data;
    var _b = useTable(_columns, _data, {
        sortable: true,
    }), headers = _b.headers, rows = _b.rows;
    return (React.createElement("table", null,
        React.createElement("thead", null,
            React.createElement("tr", null, headers.map(function (header) { return (React.createElement(StyledTh, { key: "header-" + header.id, "data-testid": "column-" + header.name },
                header.label,
                header.sorted && header.sorted.on ? React.createElement("span", { "data-testid": "sorted-" + header.name }) : null)); }))),
        React.createElement("tbody", null, rows.map(function (row) { return (React.createElement("tr", { "data-testid": "row-" + row.id, key: row.id }, row.cells.map(function (cell) { return (React.createElement("td", null, cell.render())); }))); }))));
};
var TableComponent = function () {
    var memoColumns = useMemo(function () { return columns; }, []);
    var memoData = useMemo(function () { return data; }, []);
    return React.createElement(Table, { _columns: memoColumns, _data: memoData });
};
export default {
    title: "Components/Table",
    component: TableComponent,
    argTypes: {},
};
export var Default = function () {
    return (React.createElement("div", { style: { width: "500px" } },
        React.createElement(TableComponent, null)));
};
