import { HttpParams } from '@angular/common/http';
import { ROLES, ROLES_KEYS } from '../constants/auth';
import { ASC } from '../constants/queries';

export const createPageHttp = ({ limit = 10, page = 0, order = 'id', orderBy = ASC }) => {
  return new HttpParams()
    .set('limit', limit.toString())
    .set('page', page.toString())
    .set('order', order)
    .set('order_by', orderBy);
};

export const getPathByRole = ( role: string | number, currentUserId: any ) => {
  if ( role  === ROLES.backoffice ) {
    return ROLES_KEYS.backofficeadmin;
  }
  return `${ROLES_KEYS[role]}/${currentUserId}`;
};
