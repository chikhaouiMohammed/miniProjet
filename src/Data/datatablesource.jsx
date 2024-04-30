export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "UserName",
    headerName: "UserName",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="" />
          {params.row.UserName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "Age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "dateofbirth",
    headerName: "dateofbirth",
    width: 160,
  },
  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "roomType",
    headerName: "roomType",
    width: 120,
  },

];