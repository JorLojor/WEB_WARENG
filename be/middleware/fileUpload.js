const fs = require('fs');
const puppeteer = require('puppeteer');


const generateHTML = ({ nameAcara, jenisSurat, isiAcara, tanggalMulai, tanggalSelesai, tempatAcara,Rt,Rw,RtName,RwName }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Surat Acara</title>
        <style>
            .container {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .card {
                width: 100%;
                height: 100%;
                border: 1px solid black;
                padding: 20px;
            }
            .card-header {
                text-align: center;
            }
            .card-body {
                margin-top: 20px;
            }
            .card-body .row {
                margin-bottom: 10px;
            }
            .card-body .row .col-3 {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    <h3>Surat Acara</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-3">Nama Acara</div>
                        <div class="col-9">: ${nameAcara}</div>
                    </div>
                    <div class="row">
                        <div class="col-3">Jenis Surat</div>
                        <div class="col-9">: ${jenisSurat}</div>
                    </div>
                    <div class="row">
                        <div class="col-3">Isi Acara</div>
                        <div class="col-9">: ${isiAcara}</div>
                    </div>
                    <div class="row">
                        <div class="col-3">Tanggal Mulai</div>
                        <div class="col-9">: ${tanggalMulai}</div>
                    </div>
                    <div class="row">
                        <div class="col-3">Tanggal Selesai</div>
                        <div class="col-9">: ${tanggalSelesai}</div>
                    </div>
                    <div class="row">
                        <div class="col-3">Tempat Acara</div>
                        <div class="col-9">: ${tempatAcara}</div>
                    </div>
                </div>
            </div>
           
        </div>
        <h3>Disetujui Oleh</h3> 
        <table>
            <tr>
                <th>Rt</th>
                <th>Rw</th>
                <th>RtName</th>
                <th>RwName</th>
            </tr>
            <tr>
                <td>${Rt}</td>
                <td>${Rw}</td>
                <td>${RtName}</td>
                <td>${RwName}</td>
            </tr>       
        </table>        
    </body>
    `;
};

const savePDF = async (pdfhtml, nameAcara) => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage(); 

    await page.setContent(pdfhtml);
    await page.emulateMediaType('screen');
    const pdfBuffer = await page.pdf({ format: 'A4' });
    const pdfPath = `${__dirname}/../assets/document`;
    const pdfName = `Surat-${nameAcara}.pdf`;
    const pdfFullPath = `${pdfPath}/${pdfName}`;
    fs.writeFileSync(pdfFullPath, pdfBuffer);

    await browser.close();
    return pdfName;
};

const generatePDF = async (data) => {
    const html = generateHTML(data);
    const pdfName = await savePDF(html, data.nameAcara);
    return pdfName;
}

module.exports = { generatePDF };
