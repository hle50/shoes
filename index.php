<?php

require 'vendor/autoload.php';

function getDB()
{
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "acis";

    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_EMULATE_PREPARES, TRUE);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbConnection;
}

$app = new \Slim\Slim();

$app->get('/', function () use ($app) {
    $app->response->setStatus(200);
    $app->response->redirect('app/index.html');

});

/**
 * get all category
 */
$app->get('/category', function () {
    $app = \Slim\Slim::getInstance();

    try {
        $db = getDB();
        $sth = $db->query("SELECT * FROM category");
        $category = $sth->fetchAll(PDO::FETCH_OBJ);

        if ($category) {
            $app->response->setStatus(200);
            $app->response()->headers->set('Content-Type', 'application/json');
            echo '{"categories": ' . json_encode($category) . '}';
            $db = null;
        } else {
            throw new PDOException('No records found.');
        }

    } catch (PDOException $e) {
        $app->response()->setStatus(404);
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }
});

/**
 * update category
 */
$app->post('/updateCategory', function () use ($app) {
    $json = $app->request->getBody();

    $data =json_decode($json, true);
    $id = (int)$data['id'];
    $name = $data['categoryName'];
    $isEnable = (int)$data['isEnable'];
    $sortOrder = (int)$data['sortOrder'];

    try {
        $db = getDB();
        $sth = $db->prepare("UPDATE category set categoryName=?, isEnable=?, sortOrder=? WHERE id=?");
        $sth->execute(array($name, $isEnable, $sortOrder, $id));
        $app->response->setStatus(200);
        $app->response()->headers->set('Content-Type', 'application/json');
        echo json_encode(array("status" => "success", "code" => 1));
        $db = null;

    } catch (PDOException $e) {
        $app->response()->setStatus(404);
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }

});
/**
 * create category
 */
$app->post('/createCategory', function () use ($app) {

    $json = $app->request->getBody();
     $data =json_decode($json, true);
    $name = $data['name'];
    $sortOrder =(int)$data['order'];

    try {
        $db = getDB();
        $sth = $db->prepare("INSERT INTO category (categoryName, sortOrder) VALUES (?,?)");
        $sth->execute(array($name, $sortOrder));
        $app->response->setStatus(200);
        $app->response()->headers->set('Content-Type', 'application/json');
        echo json_encode(array("status" => "success", "code" => 1));
        $db = null;

    } catch (PDOException $e) {
        $app->response()->setStatus(404);
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }

});

/**
 * get all product
 */
$app->get('/getAllProduct', function () use ($app) {

    try {
        $db = getDB();
        $sth = $db->query("SELECT * FROM product");
        $product = $sth->fetchAll(PDO::FETCH_OBJ);
        if ($product) {
            $app->response->setStatus(200);
            $app->response()->headers->set('Content-Type', 'application/json');
            echo '{"products": ' . json_encode($product) . '}';
            $db = null;
        }
    } catch (PDOException $e) {
        $app->response()->setStatus(404);
        echo '{"error":{"text":' . $e->getMessage() . '}}';
    }

});

$app->run();