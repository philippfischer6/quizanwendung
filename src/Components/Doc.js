import { savePDF } from '@progress/kendo-react-pdf';

//Configure format and Size of the PDF which is being created
class DocService {
  createPdf = (html) => {
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: 'result.pdf',
      margin: 3
    })
  }
}

const Doc = new DocService();
export default Doc;