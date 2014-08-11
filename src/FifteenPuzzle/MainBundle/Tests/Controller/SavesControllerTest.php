<?php
namespace FifteenPuzzle\MainBundle\Tests\Controller;

use FifteenPuzzle\MainBundle\Controller\SavesController;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SavesControllerTest extends WebTestCase
{
    public function testSave() {
        $client = static::createClient();
        $pieceArrangementMap = 'test';

        $crawler = $client->request('POST', '/save', array('pieceArrangementMap' => 'test'));          

        // If save works correctly, response should start with text "Saved piece arrangement map"
        $this->assertGreaterThan(0, $crawler->filter('html:contains("Saved piece arrangement map")')->count());
    }
}
