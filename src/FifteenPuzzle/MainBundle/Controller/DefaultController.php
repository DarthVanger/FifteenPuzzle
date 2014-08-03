<?php

namespace FifteenPuzzle\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('FifteenPuzzleMainBundle:Default:index.html.twig');
    }
}
