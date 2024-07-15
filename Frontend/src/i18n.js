import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    returnObjects: true,
    // interpolation: {
    //   escapeValue: false,
    // }

    resources: {
      en: {
        translation: {
          languageChangeMsg: 'Language is changed to English.',
          addEmployee: {
            Fimage: 'Image',
            Fmname: 'Name',
            Fmaddress: 'Address',
            Fmcity: 'City',
            Fmstate: 'State',
            Fmcountry: 'Country',
            Fmsalary: 'Salary',
            Fmbtn: 'Add Employee',
          },
          header: {
            home: 'Home',
            map: 'Map',
            addEmp: 'Add Employee',
            visData: 'Visualize Data',
          },
          tables: {
            Tbname: 'Name',
            Tbaddress: 'Address',
            Tbcity: 'City',
            Tbstate: 'State',
            Tbcountry:  'Country',
            Tbsalary: 'Salary',
            Tboperation: 'Operation',
            Tbbutton: 'Delete',
            popup: {
              title: 'Delete for sure?',
              ok: 'Ok',
              cancel: 'Cancel',
            }
          },
          chart:{
            PieTitle:'Employees Salary Visualisation',
            BarTitle: 'Salary Range of Employees',
            employee: 'Employee',
            salary: 'salary',
          }
        }
      },
      hi: {
        translation: {
          languageChangeMsg: 'भाषा बदलकर हिंदी कर दी गई है।',
          addEmployee: {
            Fmname: 'नाम',
            Fmaddress: 'पता',
            Fmcity: 'शहर',
            Fmstate: 'राज्य',
            Fmcountry: 'देश',
            Fmsalary: 'वेतन',
            Fmbtn: 'कर्मचारी जोड़ें',
          },
          header: {
            home: 'होम',
            map: 'नक्शा',
            addEmp: 'कर्मचारी जोड़ें',
            visData: 'डेटा विज़ुअलाइज़',
          },
          tables: {
            Tbname: 'नाम',
            Tbaddress: 'पता',
            Tbcity: 'शहर',
            Tbstate: 'राज्य',
            Tbcountry: 'देश',
            Tbsalary: 'वेतन',
            Tboperation: 'आपरेशन',
            Tbbutton: 'हटाए',
            popup: {
              title: 'निश्चित रूप से हटाएँ?',
              ok: 'ठीक है',
              cancel: 'रद्द करें',
            }
          },
          chart:{
            PieTitle: 'कर्मचारियों का वेतन दृश्य',
            BarTitle: 'कर्मचारियों की वेतन सीमा',
            employee: 'कर्मचारी',
            salary: 'वेतन',
          }
        }
      },
      ja:{
        translation: {
          languageChangeMsg: '言語が日本語に変更されました。',
          addEmployee: {
            Fmname: '名前',
            Fmaddress: '住所',
            Fmcity: '市',
            Fmstate: '州',
            Fmcountry: '国',
            Fmsalary: '給料',
            Fmbtn: '従業員を追加',
          },
          header: {
            home: '家',
            map: '地図',
            addEmp: '従業員を追加',
            visData: 'データを視覚化する',
          },
          tables: {
            Tbname: '名前',
            Tbaddress: '住所',
            Tbcity: '市',
            Tbstate: '州',
            Tbcountry:  '国',
            Tbsalary: '給料',
            Tboperation: '手術',
            Tbbutton: '消去',
            popup: {
              title: '本当に削除しますか?',
              ok: '宜しい',
              cancel: 'キャンセル',
            }
          },
          chart:{
            PieTitle:'従業員給与の可視化',
            BarTitle: '従業員の給与範囲',
            employee: '従業員',
            salary: '給料',
          }
        }
      },
    }

  });


export default i18n;