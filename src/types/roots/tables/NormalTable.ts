interface IColumn {
  name: string;
  selector: (row: any) => any;
}

export interface INormalTable {
  columns: IColumn[];
  tableData: any;
}
