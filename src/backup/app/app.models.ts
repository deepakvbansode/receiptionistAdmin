export interface IPurpose {
  id ?: string,
  purpose : string
}

export interface IEmployee {
  id ?: string,
  name : string,
  mobile : number,
  role : string,
  ext : number,
  avtar ?: string
}

export interface IVisitor {
  id ?: string,
  avtar : string,
  avtarPath : string,
  name : string,
  mobile: number,
  purpose : string,
  visiting_whom_name : string,
  visiting_whom_id : string,
  place : string,
  in_time : number,
  out_time : number,
  status : number
}

