const fs = require('fs');
const puppeteer = require('puppeteer');


const generateHTML = ({ nameAcara, jenisSurat, isiAcara, tanggalMulai, tanggalSelesai, tempatAcara, RtName, RwName }) => {
    const formattedTanggalMulai = formatTime(tanggalMulai);
    const formattedTanggalSelesai = formatTime(tanggalSelesai);

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Surat Acara</title>
            <style>
                /* CSS styling */
            </style>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <div class="card-header">
                        <h3>Surat Acara</h3>
                    </div>
                    <div class="card-body">
                        <!-- Informasi acara -->
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
                            <div class="col-9">: ${formattedTanggalMulai}</div> <!-- Gunakan tanggal yang diformat -->
                        </div>
                        <div class="row">
                            <div class="col-3">Tanggal Selesai</div>
                            <div class="col-9">: ${formattedTanggalSelesai}</div> <!-- Gunakan tanggal yang diformat -->
                        </div>
                        <div class="row">
                            <div class="col-3">Tempat Acara</div>
                            <div class="col-9">: ${tempatAcara}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Disetujui oleh RT dan RW -->
            <h3>Disetujui Oleh</h3> 
            <table>
                <tr>
                    <th class="col-3 text-center">Rt</th>
                    <th class="col-3 text-center">Rw</th>
                </tr>
                <tr>
                    <td class="col-3 text-center">${RtName}</td>
                    <td class="col-3 text-center">${RwName}</td>
                </tr>       
            </table>        
        </body>
        `;
};


const formatTime = (timeString) => {
    const date = new Date(timeString);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${dateNum} ${month} ${year} ${hours}:${minutes}`;
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
