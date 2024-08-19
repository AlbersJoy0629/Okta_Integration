const db = require("../../../db");

// Generate banner id
const generateId = require('uuid').v4;

const GetAllNotificationBanners = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notification_bar');
    res.json(rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetNotificationBanner = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notification_bar WHERE id = ?', [req.params.bannerId]);
    const banner = rows[0];
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }
    res.json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const UpdateNotificationBanner = async (req, res) => {
  try {
    const { bannerId: id } = req.params;
    const updatedItem = req.body;
    const [result] = await db.query('UPDATE notification_bar SET ? WHERE id = ?', [updatedItem, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const [updatedBanner] = await db.query('SELECT * FROM notification_bar WHERE id = ?', [id]);
    res.json(updatedBanner[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CreateNotificationBanner = async (req, res) => {
  try {
    const newBanner = {
      title: req.body.TITLE,
      text: req.body.TEXT,
      hyperlink: req.body.HYPERLINK,
    };
    
    // Check the number of existing banners
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM notification_bar');
    // if (rows[0].count >= 3) {
    //   return res.status(400).json({ message: 'Cannot create more than 3 banners' });
    // }

    await db.query('INSERT INTO notification_bar SET ?', [newBanner]);
    res.status(200).json(newBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteNotificationBanner = async (req, res) => {
  try {
    const { bannerId: id } = req.params;
    console.log(id);
    const [result] = await db.query('DELETE FROM notification_bar WHERE ID = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  GetAllNotificationBanners,
  GetNotificationBanner,
  UpdateNotificationBanner,
  CreateNotificationBanner,
  DeleteNotificationBanner,
};
