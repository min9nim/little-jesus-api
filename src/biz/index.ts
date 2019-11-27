const asis = {
  "_id": "5ddc13c6c1f75b0b6b5e1b27",
  "owner": {
    "_id": "5dbcce4501075e5bcc98c681",
    "name": "김성진",
    "teacher": {
      "_id": "5dbd44d56c185775b955ffa8",
      "name": "신의"
    }
  },
  "date": "20191124",
  "attendance": true,
  "meditation": 0,
  "invitation": 0,
  "visitcall": false,
  "recitation": false,
  "etc": ""
}


export function buildItemsField(asis){
  if(asis.items){
    return asis
  }
	return {...asis, items: [
    {
      type: '5dd2f8abef21600f31538547',
      value: asis.attendance,
    },
    {
      type: '5dd2f9ffcded1c10b89e3ce2',
      value: asis.visitcall,
    },
    {
      type: '5dd2fb28602a3211f5543d82',
      value: asis.invitation,
    },
    {
      type: '5dd2fb36602a3211f5543d83',
      value: asis.meditation,
    },
    {
      type: '5dd2fb5d602a3211f5543d84',
      value: asis.recitation,
    },
  ]}
}