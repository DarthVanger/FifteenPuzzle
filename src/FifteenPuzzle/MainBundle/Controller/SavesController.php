<?php

namespace FifteenPuzzle\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpFoundation\Cookie;

use FifteenPuzzle\MainBundle\Entity\User;

/**
 *  Saves Controller
 *  Provides API for saving game and getting a save.
 */
class SavesController extends Controller
{
    /**
     *  Save piece arrangement to database
     *
     *  @return Response
     */
    public function savePieceArrangementAction(Request $request)
    {
        $response = new Response();

        // get the piece arrangement map from $_POST
        $pieceArrangementMap = $request->request->get('pieceArrangementMap');
        if (!$pieceArrangementMap) {
            return new Response('Cannot find piece arrangement in the request!, request content = ' . $request->getContent());
        }

        // get user id from cookies
        $userId = $request->cookies->get('user_id');
        if (!$userId) {
            // if new user
            // generate new user id
            $userId = uniqid();
            // save id to cookie
            // set expiration time to 7 days
            $expirationTime = time() + (3600 * 24 * 7);
            $response->headers->setCookie(new Cookie('user_id', $userId, $expirationTime));

            // persist user with piece arrangement map to the database
            $user = new User(); 
            $user->setId($userId);
            $user->setSave($pieceArrangementMap);

            $em = $this->get('fifteen_puzzle.user_manager');
            $em->persist($user);
            $em->scheduleDeleteInOneWeek($user);
            $em->flush();
        } else {
            // existing user
            $em = $this->get('fifteen_puzzle.user_manager');
            $user = $em->getRepository('FifteenPuzzleMainBundle:User')->find($userId);

            // throw exception if it appears that user doesn't exist
            if (!$user) {
                throw $this->createNotFoundException(
                    'No user found for id '.$userId
                );
            }

            // update the user with new save
            $user->setSave($pieceArrangementMap);
            $em->flush();
        }

        $response->setContent('Saved piece arrangement map for user with id = ' . $userId);
        return $response;
    }

    /**
     *  Get saved piece arrangement.
     *  Returns response with piece arrangement map json string, if save for the client exists,
     *  else returns response with string "save doesn't exist".   
     *
     *  @return Response
     */
    public function getPieceArrangementMapAction() {
        $request = Request::createFromGlobals();
        $response = new Response();

        // get user id from cookies
        $userId = $request->cookies->get('user_id');
        if (!$userId) {
            // user doesn't exist
            $response->setContent('save doesn\'t exist');
            return $response;
        } else {
            // existing user
            $em = $this->get('fifteen_puzzle.user_manager');
            $user = $em->getRepository('FifteenPuzzleMainBundle:User')->find($userId);
            $save = $user->getSave();
            $response->setContent($save);
            return $response;
        }
    }
}
