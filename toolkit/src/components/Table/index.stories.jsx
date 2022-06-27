"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var index_1 = require("./index");
var const_1 = require("./example/const");
var header_1 = require("./example/header");
var Table = function (_a) {
    var _columns = _a._columns, _data = _a._data;
    var _b = index_1.useTable(_columns, _data, {
        sortable: true,
    }), headers = _b.headers, rows = _b.rows;
    return (<table>
      <thead>
        <tr>
          {headers.map(function (header) { return (<header_1.default key={"header-" + header.id} data-testid={"column-" + header.name}>
              {header.label}

              {header.sorted && header.sorted.on ? <span data-testid={"sorted-" + header.name}/> : null}
            </header_1.default>); })}
        </tr>
      </thead>
      <tbody>
        {rows.map(function (row) { return (<tr data-testid={"row-" + row.id} key={row.id}>
            {row.cells.map(function (cell) { return (<td>{cell.render()}</td>); })}
          </tr>); })}
      </tbody>
    </table>);
};
var TableComponent = function () {
    var memoColumns = react_1.useMemo(function () { return const_1.columns; }, []);
    var memoData = react_1.useMemo(function () { return const_1.data; }, []);
    return <Table _columns={memoColumns} _data={memoData}/>;
};
exports.default = {
    title: "Components/Table",
    component: TableComponent,
    argTypes: {},
};
var Default = function () {
    return (<div style={{ width: "500px" }}>
      <TableComponent />
    </div>);
};
exports.Default = Default;
