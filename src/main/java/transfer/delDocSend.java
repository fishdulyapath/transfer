package transfer;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.text.DecimalFormat;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import utils._global;
import utils._routine;

@WebServlet(name = "del-doc-send", urlPatterns = {"/delDocSend"})
public class delDocSend extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        StringBuilder __html = new StringBuilder();

        HttpSession _sess = request.getSession();
        String keyword = "", barcode = "";

        DecimalFormat decim = new DecimalFormat("#,###.##");

        if (_sess.getAttribute("user") == null || _sess.getAttribute("user").toString().isEmpty()) {

            return;
        }

        String __user = _sess.getAttribute("user").toString().toUpperCase();
        String __dbname = _sess.getAttribute("dbname").toString().toLowerCase();
        String __provider = _sess.getAttribute("provider").toString().toLowerCase();

        JSONArray jsarr = new JSONArray();

        Connection __conn = null;
        try {
            _routine __routine = new _routine();
            __conn = __routine._connect(__dbname, _global.FILE_CONFIG(__provider));

            String __queryExtend = "";
            String _code = "";
            String _name = "";

            String query1 = "select code,name_1  from ar_customer";
            //System.out.println("query1 "+query1);
            PreparedStatement __stmt = __conn.prepareStatement(query1, ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
            ResultSet __rsHead = __stmt.executeQuery();

            ResultSetMetaData _rsHeadMd = __rsHead.getMetaData();
            int _colHeadCount = _rsHeadMd.getColumnCount();

            int row = __rsHead.getRow();

            while (__rsHead.next()) {

                JSONObject obj = new JSONObject();
                obj.put("code", __rsHead.getString("code"));
                obj.put("name_1", __rsHead.getString("name_1"));
                jsarr.put(obj);
            }

            __rsHead.close();

            __stmt.close();

        } catch (SQLException e) {
            __html.append(e.getMessage());
            e.printStackTrace();
        } catch (Exception e) {
            __html.append(e.getMessage());
            e.printStackTrace();
        } finally {
            if (__conn != null) {
                try {
                    __conn.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        }

        response.getWriter().print(jsarr);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        HttpSession _sess = request.getSession();
        if (_sess.getAttribute("user") == null || _sess.getAttribute("user").toString().isEmpty()) {

            return;
        }

        String __user = _sess.getAttribute("user").toString().toUpperCase();
        String __dbname = _sess.getAttribute("dbname").toString().toLowerCase();
        String __provider = _sess.getAttribute("provider").toString().toLowerCase();

        String __doc_no = request.getParameter("doc_no");

        HttpSession session = request.getSession(true);

        StringBuilder _insert_trans_sale_temp = new StringBuilder();

        StringBuilder _insert_trans_log = new StringBuilder();
        _routine __routine = new _routine();
        StringBuilder __result = new StringBuilder();

        try {
            Connection __conn = __routine._connect(__dbname, _global.FILE_CONFIG(__provider));
            _insert_trans_sale_temp.append("delete from ic_transfer_doc_temp where doc_no = '" + __doc_no + "';delete from ic_transfer_detail_temp where doc_no = '" + __doc_no + "';");
            _insert_trans_sale_temp.append("insert into ic_transfer_log (doc_no,wid_doc,approve_code,screen) values ('','" + __doc_no + "','" + __user + "','1');");
            PreparedStatement __stmt_trans = __conn.prepareStatement(_insert_trans_sale_temp.toString());

            System.out.println(_insert_trans_sale_temp);

            __stmt_trans.executeUpdate();
            __stmt_trans.close();

            __conn.close();

        } catch (Exception e) {
            e.printStackTrace();
            response.getWriter().print(e);
        }

        response.getWriter().print("success");
    }

}
