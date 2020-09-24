import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  ListNoticeResponse,
  NoticePaginator,
  ListManualPurchaseResponse,
  ManualPurchasePaginator
} from '../interfaces/notices.interface';

import { Provider } from '../interfaces/provider.interface';
import { Subsidiaries } from '../interfaces/subsidiaries.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getPathByRole } from '../utils/request';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  constructor(private http: HttpClient) {}

  getNotices(
    status: string,
    page = 0,
    limit = 10,
    orderBy = 'descending',
    order = 'id'
  ): Observable<NoticePaginator> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('order_by', orderBy.toString())
      .set('order', order.toString())
      .set('limit', limit.toString());
    return this.http
      .get<ListNoticeResponse>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/notice/status/${status}`,
        { params }
      )
      .pipe(
        map(({ content, ...noticeDataPaginator }) => ({
          data: content,
          ...noticeDataPaginator,
        }))
      );
  }

  getManualPurchases(
    page = 0,
    limit = 10,
    order: string,
    orderBy: string
  ): Observable<ManualPurchasePaginator> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
      // .set('order', order)
      // .set('orderBy', orderBy);
      // TODO actualizar ruta endpoint David
    return this.http
      .get<ListManualPurchaseResponse>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/order/manualpurchase/${orderBy}`,
        { params }
      )
      .pipe(
        map(({ content, ...manualPurchasesDataPaginator }) => ({
          data: content,
          ...manualPurchasesDataPaginator,
        }))
      );
  }

  getNoticesFilter(
    filter: string,
    page = 0,
    limit = 10,
    orderBy = 'descending',
    order = 'id'
  ): Observable<NoticePaginator> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('order_by', orderBy.toString())
      .set('order', order.toString())
      .set('limit', limit.toString());
    return this.http
      .get<ListNoticeResponse>(
        `http://localhost:8080/o/ProviderCompraDigitalPortlet/api/notice/filter/${filter}`,
        { params }
      )
      .pipe(
        map(({ content, ...noticeDataPaginator }) => ({
          data: content,
          ...noticeDataPaginator,
        }))
      );
  }
  getNoticeDetail(id: number | string) {
    // TODO actualizar ruta endpoint
    return this.http.get(`rutaEndpoint/notice/${id}`);
  }

  getProvider() {
    return this.http.get<Provider>(
      // TODO actualizar ruta endpoint
      `rutaEndpoint/subocol/provider`
    );
  }

  getSubsidiary(id: any) {
    return this.http.get<Subsidiaries>(
      // TODO actualizar ruta endpoint
      `rutaEndpoint/subsidiary/provider/${id}`
    );
  }

  manualPurchase(body: any) {
    // TODO actualizar ruta endpoint
    return this.http.post(`rutaEndpoint/order/manual`, body);
  }

  getNoticesByProvider(
    currentRole: string | number,
    currentUserId: any,
    status: string,
    page = 0,
    orderBy = 'descending',
    limit = 10
  ) {
    const path = getPathByRole(currentRole, currentUserId);
    const params = new HttpParams()
      .set('status', status)
      .set('orderBy', orderBy)
      .set('limit', limit.toString())
      .set('page', page.toString());
    // TODO actualizar ruta endpoint
    return this.http
      .get<ListNoticeResponse>(`http://localhost:8080/o/ProviderCompraDigitalPortlet/api/notice/${path}`, {
        params,
      })
      .pipe(
        map(({ content, ...dataPaginator }) => ({
          data: content,
          dataPaginator,
        }))
      );
  }
  
// TODO borrar Dummy
getNoticesByProvider2(): any {
  let content = [
    {
       "id":1,
       "external_event":582244,
       "plate":"AAA123",
       "date":"2020-03-09T05:00:00.000+0000",
       "brand":"RENAULT",
       "line":"DUSTER",
       "workshop":"AUTOLARTE S.A",
       "city":"MEDELLIN",
       "status":"",
       "vin":"93Y9SR5B6HJ350021",
       "orders":[
          {
             "id":8,
             "date":"2020-03-08T18:09:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":19,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":17,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":21,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":20,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":22,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":23,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":18,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":24,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":2,
             "date":"2020-03-08T18:09:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"delayed",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":769,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":765,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":761,
                   "status":"delayed",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":753,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":773,
                   "status":"delayed",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":745,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":757,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":749,
                   "status":"delayed",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":6,
             "date":"2020-03-31T20:50:00.000+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":748,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":752,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":768,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":776,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":756,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":772,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":760,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":764,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":5,
             "date":"2020-03-08T18:09:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":755,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":759,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":763,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":775,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":747,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":751,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":767,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":771,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":3,
             "date":"2020-03-06T07:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":6,
                   "status":"rejected",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"",
                   "description":"",
                   "price":"",
                   "accept_date":""
                },
                {
                   "id":3,
                   "status":"rejected",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"",
                   "description":"",
                   "price":"",
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":1,
             "date":"2020-03-09T18:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"delayed",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":4,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"",
                   "description":"",
                   "price":"",
                   "accept_date":""
                },
                {
                   "id":1,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"",
                   "description":"",
                   "price":"",
                   "accept_date":""
                },
                {
                   "id":7,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"",
                   "description":"",
                   "price":"",
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":4,
             "date":"2020-03-09T18:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"assigned",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":770,
                   "status":"delivered",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":754,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":750,
                   "status":"delivered",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":758,
                   "status":"rejected",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":746,
                   "status":"delivered",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":762,
                   "status":"rejected",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":774,
                   "status":"delivered",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":766,
                   "status":"delayed",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":9,
             "date":"2020-03-06T07:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":144,
                   "status":"accepted",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":142,
                   "status":"accepted",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":141,
                   "status":"accepted",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":140,
                   "status":"accepted",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":138,
                   "status":"accepted",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":137,
                   "status":"accepted",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":139,
                   "status":"accepted",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":143,
                   "status":"accepted",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":7,
             "date":"2020-03-09T18:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":13,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":14,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":11,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":10,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":12,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":9,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":16,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":15,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          }
       ],
       "workshop_email":"testEmail@email.com",
       "phone":"0000000",
       "cellphone":"0000000000",
       "coverage":"PPD",
       "workshop_address":""
    },
    {
       "id":10,
       "external_event":876855,
       "plate":"AAA123",
       "date":"2020-03-09T05:00:00.000+0000",
       "brand":"RENAULT",
       "line":"DUSTER",
       "workshop":"AUTOLARTE S.A",
       "city":"MEDELLIN",
       "status":"",
       "vin":"93Y9SR5B6HJ350021",
       "orders":[
          {
             "id":84,
             "date":"2020-03-06T07:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":453,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":451,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":449,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":455,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":450,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":452,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":454,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":456,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":81,
             "date":"2020-03-06T07:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"assigned",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":85,
             "date":"2020-03-09T18:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":277,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":278,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":275,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":280,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":276,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":274,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":279,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":273,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":83,
             "date":"2020-03-08T18:09:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":443,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":444,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":446,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":448,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":442,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":441,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":445,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":447,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":80,
             "date":"2020-03-08T18:09:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":513,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":577,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":609,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":641,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":705,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":673,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":737,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":545,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":79,
             "date":"2020-03-09T18:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":544,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":608,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":704,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":512,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":672,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":736,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":576,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":640,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":87,
             "date":"2020-03-06T07:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"assigned",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":82,
             "date":"2020-03-09T18:31:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"delivered_news",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":266,
                   "status":"delivered_news",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":265,
                   "status":"delivered_news",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":271,
                   "status":"delivered_news",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":272,
                   "status":"delivered_news",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":268,
                   "status":"delivered_news",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                },
                {
                   "id":267,
                   "status":"delivered_news",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":269,
                   "status":"delivered_news",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":270,
                   "status":"delivered_news",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          },
          {
             "id":86,
             "date":"2020-03-08T18:09:03.038+0000",
             "subsidiary":{
                "id":1,
                "provider":{
                   "id":1,
                   "nit":"547547-8",
                   "name":"fixacar",
                   "phone":"314658203",
                   "email":"sebas@fixa.com",
                   "active":true,
                   "location":"",
                   "contact_name":"Sebastian Delgado",
                   "admin_user":""
                },
                "alias":"Sucursal SUBOCOL",
                "email":"sebas@fixa.com",
                "name":"extralargonombre",
                "phone":"314658203",
                "status":true,
                "location":"",
                "total_orders":"",
                "time_cities_delivery":"",
                "time_regions_delivery":"",
                "admin_user":""
             },
             "status":"rejected",
             "workshop":"AUTOLARTE S.A",
             "time":0,
             "priority":1,
             "products":[
                {
                   "id":514,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700410280",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO CLIO II SYMBOL CITIUS",
                   "price":82000.0,
                   "accept_date":""
                },
                {
                   "id":706,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8200735133",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO SANDERO STEPWAY",
                   "price":180000.0,
                   "accept_date":""
                },
                {
                   "id":738,
                   "status":"manual_purchase",
                   "amount":4,
                   "quality":"GENUINO",
                   "reference":"8200651353",
                   "description":"ABSORBEDOR BOMPER  TRASERO  LOGAN 11 ",
                   "price":27000.0,
                   "accept_date":""
                },
                {
                   "id":546,
                   "status":"manual_purchase",
                   "amount":3,
                   "quality":"GENUINO",
                   "reference":"87751 2S500",
                   "description":"BOCEL ESTRIBO IZQUIERDO HD TUCSON IX 35 2015 ",
                   "price":274000.0,
                   "accept_date":""
                },
                {
                   "id":578,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"8201401421",
                   "description":"BOCEL PUERTA LOGAN III J GO X 3 ",
                   "price":128000.0,
                   "accept_date":""
                },
                {
                   "id":642,
                   "status":"manual_purchase",
                   "amount":2,
                   "quality":"GENUINO",
                   "reference":"620932061R",
                   "description":"ABSORBEDOR BOMPER DELANTERO  IZQUIERDO OROCH",
                   "price":108000.0,
                   "accept_date":""
                },
                {
                   "id":674,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"769510712R",
                   "description":"BOCEL FALDON LATERAL DERECHO  SANDERO STEPWAY 2013 ",
                   "price":213000.0,
                   "accept_date":""
                },
                {
                   "id":610,
                   "status":"manual_purchase",
                   "amount":1,
                   "quality":"GENUINO",
                   "reference":"7700430879",
                   "description":"BOCEL PUERTA  TRASERO  IZQUIERDO MEGANE",
                   "price":316000.0,
                   "accept_date":""
                }
             ],
             "reference":"",
             "comment":"",
             "manual_purchase":false,
             "waiting_for_manual_purchase":""
          }
       ],
       "workshop_email":"testEmail@email.com",
       "phone":"0000000",
       "cellphone":"0000000000",
       "coverage":"PPD",
       "workshop_address":""
    }
 ];
/*
 let datos = [
    content,
    "first":true,
    "number_of_elements":2,
    "empty":false,
    "pageable": {
      "sort":{
        "sorted":true,
        "unsorted":false,
        "empty":false
      },
      "offset":0,
      "page_number":0,
      "page_size":10,
      "paged":true,
      "unpaged":false
    },
    "last":true,
    "total_pages":1,
    "total_elements":2,
    "size":10,
    "number":0,
    "sort":{
      "sorted":true,
      "unsorted":false,
      "empty":false
    }
 ]
 */

  return content;
}
}